package com.cropmanager.dto;

public class SeasonDTO {
    private String seasonCode;
    private String seasonName;
    private String description;
    private String comment;

    public String getSeasonCode() { return seasonCode; }
    public void setSeasonCode(String seasonCode) { this.seasonCode = seasonCode; }
    public String getSeasonName() { return seasonName; }
    public void setSeasonName(String seasonName) { this.seasonName = seasonName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}