package com.cropmanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "tblVarieties")
public class Variety {
    @Id
    @Column(name = "VarietyCode", length = 5)
    private String varietyCode;
    @Column(name = "CropCode")
    private String cropCode;
    @Column(name = "VarietyName")
    private String varietyName;

    public String getVarietyCode() { return varietyCode; }
    public void setVarietyCode(String varietyCode) { this.varietyCode = varietyCode; }
    public String getCropCode() { return cropCode; }
    public void setCropCode(String cropCode) { this.cropCode = cropCode; }
    public String getVarietyName() { return varietyName; }
    public void setVarietyName(String varietyName) { this.varietyName = varietyName; }
}