package com.api.expenses.rest.utils;

import java.time.format.DateTimeFormatter;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class DateUtils {

    public static int getWeekOfTheYear(Date inputDate) {
        String format = "yyyyMMdd"; // BASIC_ISO_DATE
        String dateAsString = inputDate.toLocalDate().format(DateTimeFormatter.BASIC_ISO_DATE);

        SimpleDateFormat df = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = (Date) df.parse(dateAsString);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int week = cal.get(Calendar.WEEK_OF_YEAR);
        return week;
    }

    public static int getMonthOfTheYear(Date inputDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(inputDate);
        return cal.get(Calendar.MONTH) + 1;
    }

    public static int getYearOfTheDate(Date inputDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(inputDate);
        return cal.get(Calendar.YEAR);
    }
}
