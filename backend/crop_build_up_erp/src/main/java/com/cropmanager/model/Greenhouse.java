package com.cropmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name = "greenhouses")
public class Greenhouse {

    @Id
    private String greenhouse;

    private Integer totalNoOfBedsRightSide;
    private Integer totalNoOfBedsLeftSide;
    private Integer totalNoOfBeds;
    private Integer totalMPPerBedOnLeftSide;
    private Integer totalMPPerBedOnRightSide;
    private Integer totalMP;

    // Getters and Setters
    public String getGreenhouse() {
        return greenhouse;
    }

    public void setGreenhouse(String greenhouse) {
        this.greenhouse = greenhouse;
    }

    public Integer getTotalNoOfBedsRightSide() {
        return totalNoOfBedsRightSide;
    }

    public void setTotalNoOfBedsRightSide(Integer totalNoOfBedsRightSide) {
        this.totalNoOfBedsRightSide = totalNoOfBedsRightSide;
    }

    public Integer getTotalNoOfBedsLeftSide() {
        return totalNoOfBedsLeftSide;
    }

    public void setTotalNoOfBedsLeftSide(Integer totalNoOfBedsLeftSide) {
        this.totalNoOfBedsLeftSide = totalNoOfBedsLeftSide;
    }

    public Integer getTotalNoOfBeds() {
        return totalNoOfBeds;
    }

    public void setTotalNoOfBeds(Integer totalNoOfBeds) {
        this.totalNoOfBeds = totalNoOfBeds;
    }

    public Integer getTotalMPPerBedOnLeftSide() {
        return totalMPPerBedOnLeftSide;
    }

    public void setTotalMPPerBedOnLeftSide(Integer totalMPPerBedOnLeftSide) {
        this.totalMPPerBedOnLeftSide = totalMPPerBedOnLeftSide;
    }

    public Integer getTotalMPPerBedOnRightSide() {
        return totalMPPerBedOnRightSide;
    }

    public void setTotalMPPerBedOnRightSide(Integer totalMPPerBedOnRightSide) {
        this.totalMPPerBedOnRightSide = totalMPPerBedOnRightSide;
    }

    public Integer getTotalMP() {
        return totalMP;
    }

    public void setTotalMP(Integer totalMP) {
        this.totalMP = totalMP;
    }
}