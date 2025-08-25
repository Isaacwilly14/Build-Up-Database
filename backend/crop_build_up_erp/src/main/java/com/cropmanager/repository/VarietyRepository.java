package com.cropmanager.repository;

import com.cropmanager.model.Variety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VarietyRepository extends JpaRepository<Variety, String> {
    boolean existsByVarietyCode(String varietyCode);
}