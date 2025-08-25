package com.cropmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblStickingPlan")
public class StockBuildup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Add other fields that correspond to your tblStickingPlan table
    private String varietyCode;
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getVarietyCode() { return varietyCode; }
    public void setVarietyCode(String varietyCode) { this.varietyCode = varietyCode; }
}