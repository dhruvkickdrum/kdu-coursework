package com.dhruv.hospital.staffing.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "shift_types")
@Data
@NoArgsConstructor
public class ShiftType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "shiftType", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Shift> shifts;
}
