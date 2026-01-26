package com.dhruv.smarthomedevicemanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Table(name = "device_inventory", indexes = {
        @Index(name = "idx_device_kickston_id", columnList = "kickston_id")
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE device_inventory SET deleted = true, deleted_at = CURRENT_TIMESTAMP WHERE id = ?")
@SQLRestriction("deleted = false")
public class DeviceInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kickston_id", nullable = false, unique = true, length = 6)
    private String kickstonId;

    @Column(name = "device_username", nullable = false, length = 100)
    private String deviceUsername;

    @Column(name = "device_password", nullable = false, length = 100)
    private String devicePassword;

    @Column(name = "manufacture_date_time", nullable = false)
    private LocalDateTime manufactureDateTime;

    @Column(name = "manufacture_factory_place", nullable = false, length = 100)
    private String manufactureFactoryPlace;

    @Column(name = "is_registered", nullable = false)
    private Boolean isRegistered = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean deleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.modifiedAt = LocalDateTime.now();
        if(deleted == null) {
            this.deleted = false;
        }
    }

    @PreUpdate
    private void onModified() {
        this.modifiedAt = LocalDateTime.now();
    }

    public boolean isDeleted() {
        return deleted == true;
    }
}
