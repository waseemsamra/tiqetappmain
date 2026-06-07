
/**
 * Transforms raw form data into a structured format suitable for the API and database.
 * Specifically, it handles the conversion of comma-separated string fields into arrays.
 */

// Helper to safely convert a value to an array of strings
const toArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.filter(item => typeof item === 'string' && item.trim() !== '');
    if (typeof value === 'string' && value.trim() !== '') {
        return value.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
};


export function transformExcursionFormData(formData: Record<string, any>) {
    const transformedData: Record<string, any> = { ...formData };

    // The form action already provides these as arrays
    transformedData.whatsincluded = formData.whatsincluded || [];
    transformedData.whatsnotincluded = formData.whatsnotincluded || [];

    // Ensure numeric types are correct
    transformedData.price = Number(formData.price) || 0;
    transformedData.rating = Number(formData.rating) || 0;

    // Ensure optional fields that should be strings are not undefined
    transformedData.operatinghours = formData.operatinghours || '';
    transformedData.instructions = formData.instructions || '';
    transformedData.howtogetthere = formData.howtogetthere || '';
    transformedData.additionalinfo = formData.additionalinfo || '';
    transformedData.cancellationpolicy = formData.cancellationpolicy || '';

    // Remove the id if it's empty, for creation
    if (!transformedData.id) {
        delete transformedData.id;
    }

    return transformedData;
}
