export const validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    schema.parse(req[source]);
    next();
  };
