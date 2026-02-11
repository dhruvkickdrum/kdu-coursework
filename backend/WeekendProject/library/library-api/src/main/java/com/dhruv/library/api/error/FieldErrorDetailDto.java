package com.dhruv.library.api.error;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class FieldErrorDetailDto {
    String field;
    String issue;
}
