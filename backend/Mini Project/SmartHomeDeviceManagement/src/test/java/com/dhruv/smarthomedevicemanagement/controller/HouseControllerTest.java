package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.HouseResponseDto;
import com.dhruv.smarthomedevicemanagement.security.JwtTokenProvider;
import com.dhruv.smarthomedevicemanagement.services.HouseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HouseController.class)
@AutoConfigureMockMvc(addFilters = false)
public class HouseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HouseService houseService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    private List<HouseResponseDto> houseResponses;

    @BeforeEach
    void setUp() {
        HouseResponseDto house1 = HouseResponseDto.builder()
                .id(1L)
                .name("Home")
                .address("123 Main St")
                .adminId(1L)
                .adminUsername("john_doe")
                .createdAt(LocalDateTime.now())
                .build();

        HouseResponseDto house2 = HouseResponseDto.builder()
                .id(2L)
                .name("Vacation Home")
                .address("456 Beach Rd")
                .adminId(1L)
                .adminUsername("john_doe")
                .createdAt(LocalDateTime.now())
                .build();

        houseResponses = Arrays.asList(house1, house2);
    }

    @Test
    @WithMockUser
    void getAllUserHouses_Success() throws Exception {
        when(houseService.getAllUserHouses()).thenReturn(houseResponses);

        mockMvc.perform(get("/api/houses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].name").value("Home"))
                .andExpect(jsonPath("$.data[1].id").value(2))
                .andExpect(jsonPath("$.data[1].name").value("Vacation Home"));
    }
}
