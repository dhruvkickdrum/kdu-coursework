package com.dhruv.smarthomedevicemanagement.integration;

import com.dhruv.smarthomedevicemanagement.dto.*;
import com.dhruv.smarthomedevicemanagement.entity.DeviceInventory;
import com.dhruv.smarthomedevicemanagement.repository.DeviceInventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class RoomDeviceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DeviceInventoryRepository deviceInventoryRepository;

    private String authToken;
    private Long houseId;
    private Long room1Id;
    private Long room2Id;

    @BeforeEach
    void setUp() throws Exception {
        // Create sample device inventory
        createDeviceInventory();

        // Register and login user
        authToken = registerAndLogin();

        // Create house
        houseId = createHouse();

        // Create rooms
        room1Id = createRoom(houseId, "Living Room");
        room2Id = createRoom(houseId, "Bedroom");
    }

    @Test
    void testListRoomsAndDevices_WithMultipleDevices() throws Exception {
        // Add devices to different rooms
        addDevice(houseId, room1Id, "000001", "device_user_001", "pass_001", "Smart Light 1");
        addDevice(houseId, room1Id, "000002", "device_user_002", "pass_002", "Smart Light 2");
        addDevice(houseId, room2Id, "000003", "device_user_003", "pass_003", "Smart Thermostat");

        // Get rooms with devices
        MvcResult result = mockMvc.perform(get("/api/houses/" + houseId + "/rooms/with-devices")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andReturn();

        String content = result.getResponse().getContentAsString();
        assertThat(content).contains("Living Room");
        assertThat(content).contains("Bedroom");
        assertThat(content).contains("Smart Light 1");
        assertThat(content).contains("Smart Light 2");
        assertThat(content).contains("Smart Thermostat");
    }

    @Test
    void testListRoomsAndDevices_EmptyRooms() throws Exception {
        // Get rooms without any devices
        mockMvc.perform(get("/api/houses/" + houseId + "/rooms/with-devices")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].devices").isArray())
                .andExpect(jsonPath("$.data[0].devices.length()").value(0))
                .andExpect(jsonPath("$.data[1].devices").isArray())
                .andExpect(jsonPath("$.data[1].devices.length()").value(0));
    }


    @Test
    void testListRoomsAndDevices_SingleRoomWithDevices() throws Exception {
        // Add multiple devices to one room
        addDevice(houseId, room1Id, "000001", "device_user_001", "pass_001", "Device 1");
        addDevice(houseId, room1Id, "000002", "device_user_002", "pass_002", "Device 2");
        addDevice(houseId, room1Id, "000003", "device_user_003", "pass_003", "Device 3");

        // Get rooms with devices
        mockMvc.perform(get("/api/houses/" + houseId + "/rooms/with-devices")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("Living Room"))
                .andExpect(jsonPath("$.data[0].devices.length()").value(3))
                .andExpect(jsonPath("$.data[1].name").value("Bedroom"))
                .andExpect(jsonPath("$.data[1].devices.length()").value(0));
    }

    @Test
    void testListRoomsAndDevices_VerifyDeviceDetails() throws Exception {
        // Add a device
        addDevice(houseId, room1Id, "000001", "device_user_001", "pass_001", "Test Device");

        // Get rooms with devices and verify device details
        mockMvc.perform(get("/api/houses/" + houseId + "/rooms/with-devices")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].devices[0].name").value("Test Device"))
                .andExpect(jsonPath("$.data[0].devices[0].kickstonId").value("000001"))
                .andExpect(jsonPath("$.data[0].devices[0].roomName").value("Living Room"))
                .andExpect(jsonPath("$.data[0].devices[0].status").value("ACTIVE"))
                .andExpect(jsonPath("$.data[0].devices[0].manufactureFactoryPlace").value("China Hub 1"));
    }

    @Test
    void testListRoomsAndDevices_UnauthorizedAccess() throws Exception {
        mockMvc.perform(get("/api/houses/" + houseId + "/rooms/with-devices"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testListRoomsAndDevices_InvalidHouseId() throws Exception {
        mockMvc.perform(get("/api/houses/99999/rooms/with-devices")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isNotFound());
    }

    // Helper methods

    private void createDeviceInventory() {
        DeviceInventory device1 = DeviceInventory.builder()
                .kickstonId("000001")
                .deviceUsername("device_user_001")
                .devicePassword("pass_001")
                .manufactureDateTime(LocalDateTime.now())
                .manufactureFactoryPlace("China Hub 1")
                .isRegistered(false)
                .build();

        DeviceInventory device2 = DeviceInventory.builder()
                .kickstonId("000002")
                .deviceUsername("device_user_002")
                .devicePassword("pass_002")
                .manufactureDateTime(LocalDateTime.now())
                .manufactureFactoryPlace("China Hub 1")
                .isRegistered(false)
                .build();

        DeviceInventory device3 = DeviceInventory.builder()
                .kickstonId("000003")
                .deviceUsername("device_user_003")
                .devicePassword("pass_003")
                .manufactureDateTime(LocalDateTime.now())
                .manufactureFactoryPlace("China Hub 2")
                .isRegistered(false)
                .build();

        deviceInventoryRepository.save(device1);
        deviceInventoryRepository.save(device2);
        deviceInventoryRepository.save(device3);
    }

    private String registerAndLogin() throws Exception {
        RegisterRequestDto registerRequest = new RegisterRequestDto(
                "testuser",
                "test@example.com",
                "password123",
                "Test",
                "User"
        );

        MvcResult result = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        AuthResponseDto authResponse = objectMapper.readTree(responseContent)
                .get("data")
                .traverse(objectMapper)
                .readValueAs(AuthResponseDto.class);

        return authResponse.getToken();
    }

    private Long createHouse() throws Exception {
        CreateHouseRequestDto houseRequest = new CreateHouseRequestDto(
                "Test House",
                "123 Test Street"
        );

        MvcResult result = mockMvc.perform(post("/api/houses")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(houseRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        HouseResponseDto houseResponse = objectMapper.readTree(responseContent)
                .get("data")
                .traverse(objectMapper)
                .readValueAs(HouseResponseDto.class);

        return houseResponse.getId();
    }


    private Long createRoom(Long houseId, String name) throws Exception {
        CreateRoomRequestDto roomRequest = new CreateRoomRequestDto(name);

        MvcResult result = mockMvc.perform(post("/api/houses/" + houseId + "/rooms")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(roomRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        RoomResponseDto roomResponse = objectMapper.readTree(responseContent)
                .get("data")
                .traverse(objectMapper)
                .readValueAs(RoomResponseDto.class);

        return roomResponse.getId();
    }

    private Long addDevice(Long houseId, Long roomId, String kickstonId,
                           String username, String password, String deviceName) throws Exception {
        AddDeviceRequestDto deviceRequest = new AddDeviceRequestDto(
                kickstonId,
                username,
                password,
                deviceName,
                roomId
        );

        MvcResult result = mockMvc.perform(post("/api/houses/" + houseId + "/devices")
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(deviceRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        DeviceResponseDto deviceResponse = objectMapper.readTree(responseContent)
                .get("data")
                .traverse(objectMapper)
                .readValueAs(DeviceResponseDto.class);

        return deviceResponse.getId();
    }
}
