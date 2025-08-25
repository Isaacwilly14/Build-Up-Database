package com.cropmanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "tblGreenhouses")
public class Greenhouse {
    @Id
    @Column(name = "Greenhouse", length = 5)
    private String greenhouse;
    @Column(name = "TotalOfBedsRightSide")
    private Integer totalOfBedsRightSide;
    @Column(name = "TotalOfBedsLeftSide")
    private Integer totalOfBedsLeftSide;
    @Column(name = "TotalOfBeds")
    private Integer totalOfBeds;
    @Column(name = "TotalMPerBedXLeftSide")
    private Integer totalMPerBedXLeftSide;
    @Column(name = "TotalMPerBedXRightSide")
    private Integer totalMPerBedXRightSide;
    @Column(name = "TotalMP")
    private Integer totalMP;

    public String getGreenhouse() { return greenhouse; }
    public void setGreenhouse(String greenhouse) { this.greenhouse = greenhouse; }
    public Integer getTotalOfBedsRightSide() { return totalOfBedsRightSide; }
    public void setTotalOfBedsRightSide(Integer totalOfBedsRightSide) { this.totalOfBedsRightSide = totalOfBedsRightSide; }
    public Integer getTotalOfBedsLeftSide() { return totalOfBedsLeftSide; }
    public void setTotalOfBedsLeftSide(Integer totalOfBedsLeftSide) { this.totalOfBedsLeftSide = totalOfBedsLeftSide; }
    public Integer getTotalOfBeds() { return totalOfBeds; }
    public void setTotalOfBeds(Integer totalOfBeds) { this.totalOfBeds = totalOfBeds; }
    public Integer getTotalMPerBedXLeftSide() { return totalMPerBedXLeftSide; }
    public void setTotalMPerBedXLeftSide(Integer totalMPerBedXLeftSide) { this.totalMPerBedXLeftSide = totalMPerBedXLeftSide; }
    public Integer getTotalMPerBedXRightSide() { return totalMPerBedXRightSide; }
    public void setTotalMPerBedXRightSide(Integer totalMPerBedXRightSide) { this.totalMPerBedXRightSide = totalMPerBedXRightSide; }
    public Integer getTotalMP() { return totalMP; }
    public void setTotalMP(Integer totalMP) { this.totalMP = totalMP; }
}