package com.dhruv.smarthomedevicemanagement.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void controllerMethods() {}

    @Pointcut("within(@org.springframework.stereotype.Service *)")
    public void serviceMethods() {}

    @Before("controllerMethods()")
    public void logBeforeController(JoinPoint joinPoint) {
        log.info("Controller Method called: {}.{}() with argument: {}", joinPoint.getSignature().getDeclaringType(), joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "controllerMethods()", returning = "result")
    public void logAfterController(JoinPoint joinPoint, Object result) {
        log.info("Controller Method completed: {}.{}() returned: {}", joinPoint.getSignature().getDeclaringType(), joinPoint.getSignature().getName(), result);
    }

    @Before("serviceMethods()")
    public void logBeforeService(JoinPoint joinPoint) {
        log.debug("Service Method called: {}.{}() with arguments: {}", joinPoint.getSignature().getDeclaringType(), joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterService(JoinPoint joinPoint, Object result) {
        log.info("Service Method completed: {}.{}() returned: {}", joinPoint.getSignature().getDeclaringType(), joinPoint.getSignature().getName(), result);
    }


    @AfterThrowing(pointcut = "controllerMethods() || serviceMethods()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable exception) {
        log.error("Exception in {}.{}(): {}", joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), exception.getMessage(), exception);
    }


}
