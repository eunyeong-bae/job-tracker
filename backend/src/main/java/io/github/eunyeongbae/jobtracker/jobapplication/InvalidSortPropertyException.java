package io.github.eunyeongbae.jobtracker.jobapplication;

public class InvalidSortPropertyException extends RuntimeException {
    public InvalidSortPropertyException(String property) {
        super("정렬할 수 없는 항목입니다: " + property);
    }
}
