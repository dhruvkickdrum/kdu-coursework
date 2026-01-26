package com.dhruv.smarthomedevicemanagement.controller;


import com.dhruv.smarthomedevicemanagement.dto.DeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.MoveDeviceRequestDto;
import com.dhruv.smarthomedevicemanagement.entity.DeviceStatus;
import com.dhruv.smarthomedevicemanagement.security.JwtTokenProvider;
import com.dhruv.smarthomedevicemanagement.services.DeviceService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DeviceController.class)
@AutoConfigureMockMvc(addFilters = false)
public class DeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DeviceService deviceService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    private DeviceResponseDto deviceResponseDto;

    @BeforeEach
    void setUp() {
        deviceResponseDto = DeviceResponseDto.builder()
                .id(1L)
                .name("Smart Light")
                .kickstonId("000001")
                .houseId(1L)
                .roomId(2L)
                .roomName("Living room")
                .status(DeviceStatus.ACTIVE)
                .manufactureFactoryPlace("China hub 1")
                .manufactureDateTime(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    @WithMockUser
    void moveDevice_Success() throws Exception {
        MoveDeviceRequestDto requestDto = new MoveDeviceRequestDto(2L);

        when(deviceService.moveDevice(anyLong(), anyLong(), any(MoveDeviceRequestDto.class))).thenReturn(deviceResponseDto);

        mockMvc.perform(put("/api/houses/1/devices/1/move")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Device moved successfully"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.roomId").value(2))
                .andExpect(jsonPath("$.data.roomName").value("Living Room"));
    }

    @Test
    @WithMockUser
    void moveDevice_InvalidRequest_MissingTargetRoomId() throws Exception {
        MoveDeviceRequestDto request = new MoveDeviceRequestDto(null);

        mockMvc.perform(put("/api/houses/1/devices/1/move")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
