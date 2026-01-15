package com.dhruv.smartlock.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Aspect
@Component
@Slf4j
public class SmartLockAspect {
    // Exercise 1 - Task 2
    @Before("@annotation(com.dhruv.smartlock.annotation.AuditAccess)")
    public void logAccessAttempt() {
        log.info("ACCESS ATTEMPT: User is approaching the door");
    }

    // Exercise 1 - Task 3
    @AfterReturning("@annotation(com.dhruv.smartlock.annotation.AuditAccess)")
    public void logSuccess() {
        log.info("SUCCESS: User has entered the building");
    }


    // Exercise 2 - Task 1
    @Around("@annotation(com.dhruv.smartlock.annotation.TrackPerformance)")
    public Object trackExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();

        log.info(
                "PERFORMANCE: Method={} executed in {} ms",
                joinPoint.getSignature().toShortString(),
                (endTime - startTime)
        );
        return result;
    }

    // Exercise 2 - Task 2
    @Around("@annotation(com.dhruv.smartlock.annotation.SecureAccess)")
    public Object validateAccess(ProceedingJoinPoint joinPoint) throws Throwable {
        String user = (String) joinPoint.getArgs()[0];

        if("Unknown".equalsIgnoreCase(user)) {
            log.warn("SECURITY ALERT: Unauthorized access blocked for user={}", user);
            return null;
        }
        return joinPoint.proceed();
    }

    // Exercise 3 - Task 2
    @AfterThrowing(
            pointcut = "execution(* com.dhruv.smartlock.service..*(..))",
            throwing = "exception"
    )
    public void handleSystemFailure(Exception exception) {
        log.error("ALARM TRIGGERED: System error detected: {}", exception.getMessage(), exception);
        callEmergencyService();
    }

    private void callEmergencyService() {
        log.error("Emergency service has been notified");
    }
}

