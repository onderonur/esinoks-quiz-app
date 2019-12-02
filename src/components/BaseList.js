import React from "react";
import { List } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";

const BaseList = ({
  className,
  data,
  renderItem,
  loading,
  listEmptyMesage = "Hiç kayıt bulunamadı."
}) => {
  return !data.length && !loading ? (
    listEmptyMesage
  ) : (
    <LoadingIndicator loading={loading}>
      <List className={className}>
        {data.map((item, index) => renderItem(item, index))}
      </List>
    </LoadingIndicator>
  );
};

export default BaseList;
