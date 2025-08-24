package com.cropmanager.service;

import com.cropmanager.model.Greenhouse;
import com.cropmanager.repository.GreenhouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GreenhouseService {

    @Autowired
    private GreenhouseRepository greenhouseRepository;

    public Greenhouse createGreenhouse(Greenhouse greenhouse) {
        // Validation and Calculation checks based on the provided table schema.
        if (greenhouse.getTotalNoOfBedsRightSide() != null && greenhouse.getTotalNoOfBedsLeftSide() != null) {
            greenhouse.setTotalNoOfBeds(greenhouse.getTotalNoOfBedsRightSide() + greenhouse.getTotalNoOfBedsLeftSide());
        }

        if (greenhouse.getTotalMPPerBedOnLeftSide() != null && greenhouse.getTotalMPPerBedOnRightSide() != null) {
            greenhouse.setTotalMP(greenhouse.getTotalMPPerBedOnLeftSide() + greenhouse.getTotalMPPerBedOnRightSide());
        }
        
        return greenhouseRepository.save(greenhouse);
    }

    public List<Greenhouse> getAllGreenhouses() {
        return greenhouseRepository.findAll();
    }
}