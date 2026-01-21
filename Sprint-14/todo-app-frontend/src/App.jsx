import { useState } from "react";
import { createListSchema } from "./validations/listSchemas";
import { Modal, Input, Button, Alert } from "./components/common";
import listService from "./services/listService";

const SignInPage = ({ isOpen = true, onClose, onSuccess}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const result = createListSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return result.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const validData = validateForm();
    if (!validData) {
      return false;
    }

    try {
      setIsSubmitting(true);
      const response = await listService.createList(validData);

      resetForm();

      onSuccess?.(response.data);
      onClose();
    } catch (error) {
      setApiError(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      isPublic: true,
    });
    setErrors({});
    setApiError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New List"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Create
          </Button>
        </>
      }
    >
      {apiError && (
        <Alert
          type="error"
          message={apiError}
          className="mb-4"
          dismissible
          onDismiss={() => setApiError(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* List Name */}
        <Input
          label="List Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., Work Tasks"
          required
          error={errors.name}
        />

        {/* Description */}
        <div className="mb-4">
          <label className="label">
            Description
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What's this list for?"
            rows={3}
            className={`input resize-none ${errors.description ? "input-error" : ""}`}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        {/* Is Public Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary-600 rounded border-gray-300 
                                   focus:ring-primary-500"
          />
          <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
            Make this list public
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Public lists can be viewed by anyone with the link
        </p>
      </form>
    </Modal>
  );
};

export default SignInPage;
