"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var exercise_service_1 = require("./exercise.service");
describe('ExerciseService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(exercise_service_1.ExerciseService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=exercise.service.spec.js.map