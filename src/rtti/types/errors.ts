export interface RawRTTIAPIError {
  Code: number;
  Message: string;
}

export class RTTIAPIError extends Error {
  name = "RTTIAPIError";

  constructor(error: RawRTTIAPIError) {
    super(`Error ${error.Code}: ${error.Message}`);
  }
}
