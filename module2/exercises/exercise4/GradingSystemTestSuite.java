package cc.ku.st.module2.exercises.exercise4;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({ StudentTest.class, ParameterizedStudentTest.class })
class GradingSystemTestSuite {}