package cc.st.module2.exercises.exercise4;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({
        OrderTest.class,
        PaymentServiceTest.class,
        PaymentServiceParameterizedTest.class
})
public class AllTestsSuite {
}
