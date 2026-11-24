/**
 * Contact form — service-specific ("extended") fields.
 *
 * Single source of truth shared by the client form (rendering, clearing,
 * client-side checks) and /api/contact (server-side validation), so the
 * allowed values can never drift apart.
 */

export type FieldKind = "select" | "multi" | "radio" | "number";

/** Options that change with the value of another field in the same service. */
export interface DependentOptions {
  dependsOn: string;
  map: Record<string, string[]>;
}

export interface ServiceField {
  key: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  /** Fixed options, or options that depend on another field's value. */
  options?: string[] | DependentOptions;
  /** Unit shown next to number inputs (e.g. "SQ FT"). */
  unit?: string;
  placeholder?: string;
}

export interface ServiceConfig {
  slug: string;
  label: string;
  fields: ServiceField[];
}

export type ServiceDetails = Record<string, string | string[]>;

const STANDARD_PROPERTY_STATUS = ["Ready to Be Designed", "Under Construction", "Renovation"];

export const CONTACT_SERVICES: ServiceConfig[] = [
  {
    slug: "interior-design",
    label: "Interior Design",
    fields: [
      {
        key: "spaceType",
        label: "Space Type",
        kind: "select",
        required: true,
        options: ["Residential", "Office", "Retail", "Restaurant", "Event Space"],
      },
      {
        key: "areas",
        label: "Areas to Be Designed",
        kind: "multi",
        required: true,
        options: {
          dependsOn: "spaceType",
          map: {
            Residential: ["Living", "Bedroom", "Kitchen", "Dining", "Bath", "Entire Space", "Others"],
            Office: ["Reception", "Workstation", "Meeting Room", "Entire Space", "Others"],
            Retail: ["Reception", "Exterior", "Entire Space", "Product Showcasing", "Lighting", "Others"],
            Restaurant: [
              "Exterior",
              "Reception",
              "Dining Space",
              "Private Space",
              "Kitchen",
              "Washroom",
              "Others",
            ],
            "Event Space": ["Entire Event Area", "Exterior", "Single Booth", "Others"],
          },
        },
      },
      {
        key: "propertyStatus",
        label: "Property Status",
        kind: "select",
        required: true,
        options: {
          dependsOn: "spaceType",
          map: {
            Residential: STANDARD_PROPERTY_STATUS,
            Office: STANDARD_PROPERTY_STATUS,
            Retail: STANDARD_PROPERTY_STATUS,
            Restaurant: STANDARD_PROPERTY_STATUS,
            "Event Space": ["Existing Space", "Other"],
          },
        },
      },
      {
        key: "approximateArea",
        label: "Approximate Area",
        kind: "number",
        required: false,
        unit: "SQ FT",
        placeholder: "e.g. 1200",
      },
    ],
  },
  {
    slug: "architectural-design",
    label: "Architectural Design",
    fields: [
      {
        key: "buildingType",
        label: "Project Type",
        kind: "select",
        required: true,
        options: ["Residential Building", "Commercial Building", "Mixed Use Building"],
      },
      {
        key: "designScope",
        label: "Design Scope",
        kind: "multi",
        required: true,
        options: [
          "Space Planning / 2D Layout",
          "Building Design",
          "Outdoor Space Design",
          "Entire Design",
          "Others",
        ],
      },
      {
        key: "approximateArea",
        label: "Approximate Area",
        kind: "number",
        required: false,
        unit: "SQ FT",
        placeholder: "e.g. 3500",
      },
    ],
  },
  {
    slug: "custom-furniture",
    label: "Custom Furniture",
    fields: [
      {
        key: "furnitureType",
        label: "Furniture Type",
        kind: "select",
        required: true,
        options: [
          "Sofa",
          "Dining Table",
          "Dining Chairs",
          "Wardrobe",
          "Storage Unit",
          "Modular / Multifunctional Furniture",
          "Others",
        ],
      },
      {
        key: "furnitureRequirement",
        label: "Furniture Requirement",
        kind: "select",
        required: true,
        options: ["Design Only", "Design & Manufacturing"],
      },
      {
        key: "quantity",
        label: "Quantity",
        kind: "number",
        required: false,
        unit: "Items",
        placeholder: "e.g. 2",
      },
      {
        key: "installationRequired",
        label: "Installation Required",
        kind: "radio",
        required: true,
        options: ["Yes", "No", "Not Sure"],
      },
    ],
  },
  {
    slug: "consultancy-visualisation",
    label: "Consultancy & Visualisation",
    fields: [
      {
        key: "servicesRequired",
        label: "Service Required",
        kind: "multi",
        required: true,
        options: [
          "Design Consultation",
          "Space Planning",
          "2D Floor Plan",
          "3D Visualisation",
          "Material and Finish Guidance",
        ],
      },
      {
        key: "spaceType",
        label: "Space Type",
        kind: "select",
        required: true,
        options: ["Residential", "Commercial", "Office", "Other"],
      },
      {
        key: "floorPlanAvailable",
        label: "Floor Plan Available?",
        kind: "radio",
        required: true,
        options: ["Yes", "No", "Can Share Later"],
      },
      {
        key: "projectStatus",
        label: "Project Status",
        kind: "select",
        required: true,
        options: ["New Space", "Renovation", "Under Construction"],
      },
    ],
  },
];

export const CONTACT_SERVICE_LABELS = CONTACT_SERVICES.map((s) => s.label);

export function getServiceConfig(label: string): ServiceConfig | undefined {
  return CONTACT_SERVICES.find((s) => s.label === label);
}

/** Options currently available for a field, given the other answers. Empty when its parent is unanswered. */
export function getFieldOptions(field: ServiceField, details: ServiceDetails): string[] {
  if (!field.options) return [];
  if (Array.isArray(field.options)) return field.options;
  const parent = details[field.options.dependsOn];
  return typeof parent === "string" ? field.options.map[parent] ?? [] : [];
}

/** A dependent field is only shown once the field it depends on has a value. */
export function isFieldVisible(field: ServiceField, details: ServiceDetails): boolean {
  if (!field.options || Array.isArray(field.options)) return true;
  return getFieldOptions(field, details).length > 0;
}

/** Keys of fields whose options depend on `key` — cleared when `key` changes. */
export function getDependentKeys(service: ServiceConfig, key: string): string[] {
  return service.fields
    .filter((f) => f.options && !Array.isArray(f.options) && f.options.dependsOn === key)
    .map((f) => f.key);
}

const MAX_NUMBER = 10_000_000;

export type DetailsValidation =
  | { ok: true; details: ServiceDetails }
  | { ok: false; error: string };

/**
 * Validates and normalises the extended answers for a service.
 * Unknown keys and values outside the allowed options are rejected / dropped,
 * so only clean data reaches the database, sheet and emails.
 */
export function validateServiceDetails(service: ServiceConfig, raw: unknown): DetailsValidation {
  const input = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const details: ServiceDetails = {};

  // Fields are processed in order, so a parent's value is known before its dependants.
  for (const field of service.fields) {
    const value = input[field.key];

    if (field.kind === "number") {
      const str = typeof value === "string" ? value.trim() : typeof value === "number" ? String(value) : "";
      if (str) {
        const num = Number(str);
        if (!Number.isFinite(num) || num <= 0 || num > MAX_NUMBER) {
          return { ok: false, error: `Please enter a valid number for ${field.label}.` };
        }
        details[field.key] = String(num);
      } else if (field.required) {
        return { ok: false, error: `Please enter ${field.label}.` };
      }
      continue;
    }

    if (!isFieldVisible(field, details)) continue;
    const allowed = getFieldOptions(field, details);

    if (field.kind === "multi") {
      const list = Array.isArray(value) ? value : [];
      const picked = allowed.filter((opt) => list.includes(opt));
      if (picked.length !== list.length) {
        return { ok: false, error: `Please choose valid options for ${field.label}.` };
      }
      if (picked.length) details[field.key] = picked;
      else if (field.required) {
        return { ok: false, error: `Please select at least one option for ${field.label}.` };
      }
      continue;
    }

    // select / radio
    const str = typeof value === "string" ? value : "";
    if (str) {
      if (!allowed.includes(str)) {
        return { ok: false, error: `Please choose a valid option for ${field.label}.` };
      }
      details[field.key] = str;
    } else if (field.required) {
      return { ok: false, error: `Please select ${field.label}.` };
    }
  }

  return { ok: true, details };
}

/** Human-readable rows ("Label", "Value") for emails and the lead sheet. */
export function describeServiceDetails(service: ServiceConfig, details: ServiceDetails): Array<[string, string]> {
  return service.fields
    .filter((f) => details[f.key] !== undefined)
    .map((f) => {
      const v = details[f.key];
      const text = Array.isArray(v) ? v.join(", ") : v;
      return [f.label, f.unit ? `${text} ${f.unit}` : text];
    });
}
