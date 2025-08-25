package com.cropmanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "tblSeasons")
public class Season {
    @Id
    @Column(name = "SeasonCode", length = 2)
    private String seasonCode;
    @Column(name = "SeasonName")
    private String seasonName;
    @Column(name = "Description")
    private String description;
    @Column(name = "Comment")
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