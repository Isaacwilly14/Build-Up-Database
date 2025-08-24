package com.cropmanager.controller;

import com.cropmanager.model.Greenhouse;
import com.cropmanager.service.GreenhouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/greenhouses")
public class GreenhouseController {

    @Autowired
    private GreenhouseService greenhouseService;

    @PostMapping
    public ResponseEntity<Greenhouse> createGreenhouse(@RequestBody Greenhouse greenhouse) {
        Greenhouse newGreenhouse = greenhouseService.createGreenhouse(greenhouse);
        return new ResponseEntity<>(newGreenhouse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Greenhouse>> getAllGreenhouses() {
        List<Greenhouse> greenhouses = greenhouseService.getAllGreenhouses();
        return new ResponseEntity<>(greenhouses, HttpStatus.OK);
    }
}