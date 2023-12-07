
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const renderMessageError = (error:FetchBaseQueryError ) => {
    return ((error as FetchBaseQueryError).data as any).message
} 