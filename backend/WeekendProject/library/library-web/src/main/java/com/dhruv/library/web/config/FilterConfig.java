package com.dhruv.library.web.config;

import com.dhruv.library.web.filter.CorrelationIdFIlter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<CorrelationIdFIlter> correlationFilter() {
        FilterRegistrationBean<CorrelationIdFIlter> registration = new FilterRegistrationBean<>();

        registration.setFilter(new CorrelationIdFIlter());
        registration.setOrder(1);
        registration.addUrlPatterns("/*");


        return registration;
    }
}
