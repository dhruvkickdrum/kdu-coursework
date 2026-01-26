package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.ApiResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.CreateRoomRequestDto;
import com.dhruv.smarthomedevicemanagement.dto.RoomResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.RoomWithDeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.services.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/houses/{houseId}/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    // Create the room in the house
    @PostMapping
    public ResponseEntity<ApiResponseDto<RoomResponseDto>> createRoom(@PathVariable Long houseId, @Valid @RequestBody CreateRoomRequestDto requestDto) {
        RoomResponseDto responseDto = roomService.createRoom(houseId, requestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("Room Created Successfully", responseDto));
    }

    // Return the rooms list belong to the house (houseId)
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<RoomResponseDto>>> getRoomsByHouseId(@PathVariable Long houseId) {
        List<RoomResponseDto> rooms = roomService.getRoomByHouseId(houseId);
        return ResponseEntity.ok(ApiResponseDto.success(rooms));
    }

    // Return the room list with all the devices present in the room (belong to the house (HouseId)
    @GetMapping("/with-devices")
    public ResponseEntity<ApiResponseDto<List<RoomWithDeviceResponseDto>>> getRoomsWithDevices(@PathVariable Long houseId) {
        List<RoomWithDeviceResponseDto> rooms = roomService.getRoomsWithDevices(houseId);
        return ResponseEntity.ok(ApiResponseDto.success(rooms));
    }
}