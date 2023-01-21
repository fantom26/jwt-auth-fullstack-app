import { ClipboardEvent } from "react";

export const disableCopyInputValue = (e: ClipboardEvent<HTMLInputElement>) => e.preventDefault();
