import React from "react";
import { Formik, Form } from "formik";

const BaseForm = ({
  autoComplete,
  noValidate = true,
  enableReinitialize = true,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  style
}) => {
  const isInitialValid =
    validationSchema && initialValues
      ? validationSchema.isValidSync(initialValues)
      : undefined;

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      validationSchema={validationSchema}
      isInitialValid={isInitialValid}
      onSubmit={onSubmit}
    >
      {props => {
        return (
          <Form
            autoComplete={autoComplete}
            noValidate={noValidate}
            style={style}
          >
            {children(props)}
          </Form>
        );
      }}
    </Formik>
  );
};

export default BaseForm;
