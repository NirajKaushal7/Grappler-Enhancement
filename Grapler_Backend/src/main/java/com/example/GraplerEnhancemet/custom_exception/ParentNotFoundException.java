package com.example.GraplerEnhancemet.custom_exception;

public class ParentNotFoundException extends RuntimeException{
    public ParentNotFoundException(String message) {
        super(message);
    }

}
