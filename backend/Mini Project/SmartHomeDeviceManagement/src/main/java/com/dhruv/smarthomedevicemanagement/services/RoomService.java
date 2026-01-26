package com.dhruv.smarthomedevicemanagement.services;

import com.dhruv.smarthomedevicemanagement.dto.CreateRoomRequestDto;
import com.dhruv.smarthomedevicemanagement.dto.DeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.RoomResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.RoomWithDeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.entity.House;
import com.dhruv.smarthomedevicemanagement.entity.Room;
import com.dhruv.smarthomedevicemanagement.exception.ResourceNotFoundException;
import com.dhruv.smarthomedevicemanagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    private final RoomRepository roomRepository;
    private final HouseService houseService;
    private final DeviceService deviceService;

    @Transactional
    public RoomResponseDto createRoom(Long houseId, CreateRoomRequestDto requestDto){
        House house = houseService.getHouseAndVerifyAdmin(houseId);

        log.info("Creating room in house: {}", houseId);

        Room room = Room.builder()
                .name(requestDto.getName())
                .house(house)
                .build();

        room = roomRepository.save(room);
        log.info("Room Created Successfully: {}", room.getId());

        return mapToRoomResponse(room);
    }

    @Transactional(readOnly = true)
    public List<RoomResponseDto> getRoomByHouseId(Long houseId){
        houseService.getHouseAndVerifyAccess(houseId);

        log.info("Fetching rooms for house : {}", houseId);
        List<Room> rooms = roomRepository.findByHouseId(houseId);

        return rooms.stream()
                .map(this::mapToRoomResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<RoomWithDeviceResponseDto> getRoomsWithDevices(Long houseId) {
        houseService.getHouseAndVerifyAccess(houseId);

        log.info("Fetching rooms  with devices for house: {}", houseId);
        List<Room> rooms = roomRepository.findByHouseIdWithDevices(houseId);

        return rooms.stream()
                .map(this::maptoRoomWithDevicesResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Room getRoomById(Long roomId) {
        return roomRepository.findByIdAndDeletedAtIsNull(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id" ,roomId));
    }

    @Transactional(readOnly = true)
    public Room getRoomByIdAndVerifyAccess(Long roomId) {
        Room room = getRoomById(roomId);
        houseService.getHouseAndVerifyAccess(room.getHouse().getId());
        return room;
    }


    private RoomWithDeviceResponseDto maptoRoomWithDevicesResponse(Room room) {
        List<DeviceResponseDto> devices = room.getDevices().stream()
                .filter(device -> !device.isDeleted())
                .map(deviceService::mapToDeviceResponse)
                .collect(Collectors.toList());

        return RoomWithDeviceResponseDto.builder()
                .id(room.getId())
                .name(room.getName())
                .houseId(room.getHouse().getId())
                .devices(devices)
                .createdAt(room.getCreatedAt())
                .modifiedAt(room.getModifiedAt())
                .build();
    }

    public RoomResponseDto mapToRoomResponse(Room room) {
        return RoomResponseDto.builder()
                .id(room.getId())
                .name(room.getName())
                .houseId(room.getHouse().getId())
                .createdAt(room.getCreatedAt())
                .modifiedAt(room.getModifiedAt())
                .build();
    }
}
