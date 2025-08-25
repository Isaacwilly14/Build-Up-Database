package com.cropmanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "tblCrops")
public class Crop {
    @Id
    @Column(name = "CropCode", length = 2)
    private String cropCode;
    @Column(name = "SubGroup")
    private String subGroup;
    @Column(name = "CropName")
    private String cropName;
    @Column(name = "SeasonCode")
    private String seasonCode;

    public String getCropCode() { return cropCode; }
    public void setCropCode(String cropCode) { this.cropCode = cropCode; }
    public String getSubGroup() { return subGroup; }
    public void setSubGroup(String subGroup) { this.subGroup = subGroup; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getSeasonCode() { return seasonCode; }
    public void setSeasonCode(String seasonCode) { this.seasonCode = seasonCode; }
}