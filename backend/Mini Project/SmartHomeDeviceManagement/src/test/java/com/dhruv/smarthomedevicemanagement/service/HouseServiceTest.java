package com.dhruv.smarthomedevicemanagement.service;

import com.dhruv.smarthomedevicemanagement.dto.HouseResponseDto;
import com.dhruv.smarthomedevicemanagement.entity.House;
import com.dhruv.smarthomedevicemanagement.entity.Role;
import com.dhruv.smarthomedevicemanagement.entity.User;
import com.dhruv.smarthomedevicemanagement.repository.HouseRepository;
import com.dhruv.smarthomedevicemanagement.repository.HouseUserRepository;
import com.dhruv.smarthomedevicemanagement.services.HouseService;
import com.dhruv.smarthomedevicemanagement.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HouseServiceTest {

    @Mock
    private HouseRepository houseRepository;

    @Mock
    private HouseUserRepository houseUserRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private HouseService houseService;

    private User user;
    private List<House> houses;


    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .username("john_doe")
                .email("john@example.com")
                .role(Role.USER)
                .build();

        House house1 = House.builder()
                .id(1L)
                .name("Home")
                .address("123 Main St")
                .admin(user)
                .build();

        House house2 = House.builder()
                .id(2L)
                .name("Vacation Home")
                .address("456 Beach Rd")
                .admin(user)
                .build();

        houses = Arrays.asList(house1, house2);
    }

    @Test
    void getAllUserHouses_Success() {
        when(userService.getCurrentUser()).thenReturn(user);
        when(houseRepository.findAllByUserId(anyLong())).thenReturn(houses);

        List<HouseResponseDto> responses = houseService.getAllUserHouses();

        assertThat(responses).isNotNull();
        assertThat(responses).hasSize(2);
        assertThat(responses.get(0).getName()).isEqualTo("Home");
        assertThat(responses.get(1).getName()).isEqualTo("Vacation Home");
    }
}
