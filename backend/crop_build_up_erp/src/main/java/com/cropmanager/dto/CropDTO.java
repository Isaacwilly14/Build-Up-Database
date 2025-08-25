package com.cropmanager.dto;

public class CropDTO {
    private String cropCode;
    private String subGroup;
    private String cropName;
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