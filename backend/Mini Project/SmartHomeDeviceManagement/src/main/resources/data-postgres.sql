INSERT INTO device_inventory (
    kickston_id,
    device_username,
    device_password,
    manufacture_date_time,
    manufacture_factory_place,
    is_registered,
    deleted,
    deleted_at,
    created_at,
    modified_at
) VALUES
-- China Hub 1 devices
('000001', 'device_user_001', 'pass_001', '2024-01-15 10:30:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000002', 'device_user_002', 'pass_002', '2024-01-15 11:45:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000003', 'device_user_003', 'pass_003', '2024-01-16 09:20:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000004', 'device_user_004', 'pass_004', '2024-01-16 14:15:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000005', 'device_user_005', 'pass_005', '2024-01-17 08:30:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000006', 'device_user_006', 'pass_006', '2024-01-17 13:25:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000007', 'device_user_007', 'pass_007', '2024-01-18 10:10:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000008', 'device_user_008', 'pass_008', '2024-01-18 15:40:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('000009', 'device_user_009', 'pass_009', '2024-01-19 09:55:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('00000A', 'device_user_00A', 'pass_00A', '2024-01-19 16:20:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),

-- China Hub 2 devices
('00000B', 'device_user_00B', 'pass_00B', '2024-01-20 10:30:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),
('00000C', 'device_user_00C', 'pass_00C', '2024-01-20 11:45:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),
('00000D', 'device_user_00D', 'pass_00D', '2024-01-21 09:20:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),
('00000E', 'device_user_00E', 'pass_00E', '2024-01-21 14:15:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),
('00000F', 'device_user_00F', 'pass_00F', '2024-01-22 08:30:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),
('000010', 'device_user_010', 'pass_010', '2024-01-22 13:25:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),

-- India Hub devices
('000015', 'device_user_015', 'pass_015', '2024-01-25 10:30:00', 'India Hub', FALSE, FALSE, NULL, now(), now()),
('000016', 'device_user_016', 'pass_016', '2024-01-25 11:45:00', 'India Hub', FALSE, FALSE, NULL, now(), now()),

-- USA Hub devices
('00001B', 'device_user_01B', 'pass_01B', '2024-01-28 10:10:00', 'USA Hub', FALSE, FALSE, NULL, now(), now()),
('00001C', 'device_user_01C', 'pass_01C', '2024-01-28 15:40:00', 'USA Hub', FALSE, FALSE, NULL, now(), now()),

-- Additional devices
('ABCDEF', 'smart_light_001', 'secure123', '2024-02-01 10:00:00', 'China Hub 1', FALSE, FALSE, NULL, now(), now()),
('FEDCBA', 'smart_lock_001', 'lock456', '2024-02-01 11:00:00', 'China Hub 2', FALSE, FALSE, NULL, now(), now()),
('123456', 'smart_thermo_001', 'thermo789', '2024-02-01 12:00:00', 'India Hub', FALSE, FALSE, NULL, now(), now()),
('654321', 'smart_camera_001', 'camera321', '2024-02-01 13:00:00', 'USA Hub', FALSE, FALSE, NULL, now(), now())
    ON CONFLICT (kickston_id) DO NOTHING;
