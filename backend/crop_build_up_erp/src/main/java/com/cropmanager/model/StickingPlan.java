package com.cropmanager.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sticking_plans")
public class StickingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropCode;
    private String varietyCode;
    private String greenhouse;
    private LocalDate pStickingDate;
    private Integer pStickingWeek;
    private Integer pStickingYear;
    private Integer pEndWeek;
    private LocalDate pEndDate;
    private Integer pEndYear;
    private Integer plannedQ;
    private String eliteLevel;
    private Integer mpQuantity;
    private Integer urcPerBag;
    private Double urcQuantity;
    private Double lossPercentage;
    private Double totalLosses;
    private Integer rcsQuantity;
    private String createdBy;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCropCode() {
        return cropCode;
    }

    public void setCropCode(String cropCode) {
        this.cropCode = cropCode;
    }

    public String getVarietyCode() {
        return varietyCode;
    }

    public void setVarietyCode(String varietyCode) {
        this.varietyCode = varietyCode;
    }

    public String getGreenhouse() {
        return greenhouse;
    }

    public void setGreenhouse(String greenhouse) {
        this.greenhouse = greenhouse;
    }

    public LocalDate getPStickingDate() {
        return pStickingDate;
    }

    public void setPStickingDate(LocalDate pStickingDate) {
        this.pStickingDate = pStickingDate;
    }

    public Integer getPStickingWeek() {
        return pStickingWeek;
    }

    public void setPStickingWeek(Integer pStickingWeek) {
        this.pStickingWeek = pStickingWeek;
    }

    public Integer getPStickingYear() {
        return pStickingYear;
    }

    public void setPStickingYear(Integer pStickingYear) {
        this.pStickingYear = pStickingYear;
    }

    public Integer getPEndWeek() {
        return pEndWeek;
    }

    public void setPEndWeek(Integer pEndWeek) {
        this.pEndWeek = pEndWeek;
    }

    public LocalDate getPEndDate() {
        return pEndDate;
    }

    public void setPEndDate(LocalDate pEndDate) {
        this.pEndDate = pEndDate;
    }

    public Integer getPEndYear() {
        return pEndYear;
    }

    public void setPEndYear(Integer pEndYear) {
        this.pEndYear = pEndYear;
    }

    public Integer getPlannedQ() {
        return plannedQ;
    }

    public void setPlannedQ(Integer plannedQ) {
        this.plannedQ = plannedQ;
    }

    public String getEliteLevel() {
        return eliteLevel;
    }

    public void setEliteLevel(String eliteLevel) {
        this.eliteLevel = eliteLevel;
    }

    public Integer getMpQuantity() {
        return mpQuantity;
    }

    public void setMpQuantity(Integer mpQuantity) {
        this.mpQuantity = mpQuantity;
    }

    public Integer getUrcPerBag() {
        return urcPerBag;
    }

    public void setUrcPerBag(Integer urcPerBag) {
        this.urcPerBag = urcPerBag;
    }

    public Double getUrcQuantity() {
        return urcQuantity;
    }

    public void setUrcQuantity(Double urcQuantity) {
        this.urcQuantity = urcQuantity;
    }

    public Double getLossPercentage() {
        return lossPercentage;
    }

    public void setLossPercentage(Double lossPercentage) {
        this.lossPercentage = lossPercentage;
    }

    public Double getTotalLosses() {
        return totalLosses;
    }

    public void setTotalLosses(Double totalLosses) {
        this.totalLosses = totalLosses;
    }

    public Integer getRcsQuantity() {
        return rcsQuantity;
    }

    public void setRcsQuantity(Integer rcsQuantity) {
        this.rcsQuantity = rcsQuantity;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}