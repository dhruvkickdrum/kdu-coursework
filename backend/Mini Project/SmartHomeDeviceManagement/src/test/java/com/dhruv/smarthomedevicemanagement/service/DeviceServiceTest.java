package com.dhruv.smarthomedevicemanagement.service;

import com.dhruv.smarthomedevicemanagement.dto.DeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.MoveDeviceRequestDto;
import com.dhruv.smarthomedevicemanagement.entity.*;
import com.dhruv.smarthomedevicemanagement.exception.BadRequestException;
import com.dhruv.smarthomedevicemanagement.exception.ResourceNotFoundException;
import com.dhruv.smarthomedevicemanagement.repository.DeviceRepository;
import com.dhruv.smarthomedevicemanagement.repository.RoomRepository;
import com.dhruv.smarthomedevicemanagement.services.DeviceService;
import com.dhruv.smarthomedevicemanagement.services.HouseService;
import com.dhruv.smarthomedevicemanagement.services.RoomService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DeviceServiceTest {

    @Mock
    private DeviceRepository deviceRepository;

    @Mock
    private HouseService houseService;

    @Mock
    private RoomService roomService;

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private DeviceService deviceService;


    private Device device;
    private House house;
    private Room sourceRoom;
    private Room targetRoom;
    private DeviceInventory deviceInventory;

    @BeforeEach
    void setUp() {
        house = House.builder()
                .id(1L)
                .name("Test House")
                .build();

        sourceRoom = Room.builder()
                .id(1L)
                .name("Bedroom")
                .house(house)
                .build();

        targetRoom = Room.builder()
                .id(2L)
                .name("Living Room")
                .house(house)
                .build();

        deviceInventory = DeviceInventory.builder()
                .id(1L)
                .kickstonId("000001")
                .deviceUsername("device_user_001")
                .manufactureFactoryPlace("China Hub 1")
                .manufactureDateTime(LocalDateTime.now())
                .build();

        device = Device.builder()
                .id(1L)
                .name("Smart Light")
                .deviceInventory(deviceInventory)
                .house(house)
                .room(sourceRoom)
                .status(DeviceStatus.ACTIVE)
                .build();
    }

    @Test
    void moveDevice_Success() {
        MoveDeviceRequestDto request = new MoveDeviceRequestDto(2L);

        when(houseService.getHouseAndVerifyAccess(anyLong())).thenReturn(house);
        when(deviceRepository.findByIdAndDeletedAtIsNull(anyLong()))
                .thenReturn(Optional.of(device));
        when(roomRepository.findByIdAndDeletedAtIsNull(2L)).thenReturn(Optional.of(targetRoom));
        when(deviceRepository.save(any(Device.class))).thenReturn(device);

        DeviceResponseDto response = deviceService.moveDevice(1L, 1L, request);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        verify(deviceRepository).save(any(Device.class));
    }

    @Test
    void moveDevice_DeviceNotFound() {
        MoveDeviceRequestDto request = new MoveDeviceRequestDto(2L);

        when(houseService.getHouseAndVerifyAccess(anyLong())).thenReturn(house);
        when(deviceRepository.findByIdAndDeletedAtIsNull(anyLong()))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> deviceService.moveDevice(1L, 1L, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Device not found");
    }

    @Test
    void moveDevice_DeviceNotInHouse() {
        MoveDeviceRequestDto request = new MoveDeviceRequestDto(2L);
        House differentHouse = House.builder().id(2L).build();
        device.setHouse(differentHouse);

        when(houseService.getHouseAndVerifyAccess(anyLong())).thenReturn(house);
        when(deviceRepository.findByIdAndDeletedAtIsNull(anyLong()))
                .thenReturn(Optional.of(device));

        assertThatThrownBy(() -> deviceService.moveDevice(1L, 1L, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Device does not belong to this house");
    }

    @Test
    void moveDevice_TargetRoomNotInHouse() {
        MoveDeviceRequestDto request = new MoveDeviceRequestDto(2L);
        House differentHouse = House.builder().id(2L).build();
        targetRoom.setHouse(differentHouse);



        when(houseService.getHouseAndVerifyAccess(anyLong())).thenReturn(house);
        when(deviceRepository.findByIdAndDeletedAtIsNull(anyLong()))
                .thenReturn(Optional.of(device));
        when(roomRepository.findByIdAndDeletedAtIsNull(2L)).thenReturn(Optional.of(targetRoom));

        assertThatThrownBy(() -> deviceService.moveDevice(1L, 1L, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Target room does not belong to this house");
    }
}
