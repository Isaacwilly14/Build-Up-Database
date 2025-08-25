package com.cropmanager.dto;

public class UserDTO {
    private Integer userID;
    private String userFullName;
    private String userRole;
    private String userName;
    private String userPassword;
    private String userComputerID;

    public Integer getUserID() { return userID; }
    public void setUserID(Integer userID) { this.userID = userID; }
    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserPassword() { return userPassword; }
    public void setUserPassword(String userPassword) { this.userPassword = userPassword; }
    public String getUserComputerID() { return userComputerID; }
    public void setUserComputerID(String userComputerID) { this.userComputerID = userComputerID; }
}