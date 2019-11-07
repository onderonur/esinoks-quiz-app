import React from "react";
import sanitizeHtml from "sanitize-html";

const SanitizedHtml = ({ html }) => {
  const sanitized = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "span"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      p: ["style"],
      strong: ["style"]
    }
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

export default SanitizedHtml;
