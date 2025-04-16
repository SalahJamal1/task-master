package com.digisolfze.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin({ "http://127.0.0.1:5500", "https://task-nu-henna.vercel.app/" })
@RestController
@RequestMapping("/api/v1/expedia")
public class SearchController {

    @GetMapping
    public ResponseEntity<JsonNode> getPackages() throws JsonProcessingException {
        String url = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=test&productType=Package&clientId=test";
  
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();
        try {

            String response = restTemplate.getForObject(url, String.class);
            JsonNode jsonNode = objectMapper.readTree(response);
            return ResponseEntity.ok(jsonNode.get("offers").get("Package"));
        } catch (HttpClientErrorException err) {
            String error = "{\"error \": \"Too Many Requests \"}";
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(objectMapper.readTree(error));
        } catch (Exception err) {
            String error = err.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(objectMapper.readTree(error));
        }
    }
    @GetMapping("/search")
    public ResponseEntity<JsonNode> searchPackages(@RequestParam String originCity,
            @RequestParam String destinationCity) throws JsonProcessingException {
        String url = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=test&productType=Package&clientId=test&originCity=%s&destinationCity=%s";
        String uri = String.format(url, originCity, destinationCity);

        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();
        try {

            String response = restTemplate.getForObject(uri, String.class);
            JsonNode jsonNode = objectMapper.readTree(response);
            return ResponseEntity.ok(jsonNode.get("offers").get("Package"));
        } catch (HttpClientErrorException err) {
            String error = "{\"error \": \"Too Many Requests \"}";
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(objectMapper.readTree(error));
        } catch (Exception err) {
            String error = err.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(objectMapper.readTree(error));
        }
    }
}
