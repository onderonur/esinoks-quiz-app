import React from "react";
import { List } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";

const BaseList = ({
  data,
  renderItem,
  loading,
  listEmptyMesage = "Hiç kayıt bulunamadı."
}) => {
  return !data.length && !loading ? (
    listEmptyMesage
  ) : (
    <LoadingIndicator loading={loading}>
      <List>{data.map((item, index) => renderItem(item, index))}</List>
    </LoadingIndicator>
  );
};

export default BaseList;
