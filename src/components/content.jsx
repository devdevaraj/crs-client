import React,{ useState } from "react";
import LockIcon from '@mui/icons-material/Lock';

import EditPopup from "./editor";
import { useFetchContent } from "../hooks/fetch.hook";
import { styleConverter } from "../helper/convert";

export default function Content(props) {
    const [lock, setLock] = useState(false);
  const [{ isLoading, apiData, serverError }] =
    useFetchContent(props.cname);
  const style = styleConverter(apiData?.props);
  return (
    <>
      <span style={style}>{apiData?.content}</span>
      { !lock && props.editable && <span><LockIcon onClick={() => setLock(true)}/></span>}
      { lock && <EditPopup editable={props.editable} cname={props.cname} setLock={setLock}/>}
    </>
  );
}
