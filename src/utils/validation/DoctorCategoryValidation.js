import * as yup from "yup";

export const doctorCategorySchema = yup.object().shape({
  categoryName: yup.string().required(),
  iconUrl: yup.string().url().required(),
});

export const doctorCategorySchemaEditing = yup.object().shape({
  categoryName: yup.string().required(),
});
