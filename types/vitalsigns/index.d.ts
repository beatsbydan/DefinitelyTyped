// Type definitions for vitalsigns 0.4.3
// Project: https://github.com/TomFrost/node-vitalsigns
// Definitions by: Cyril Schumacher <https://github.com/cyrilschumacher>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

///<reference types="express"/>

declare module "vitalsigns" {
    import { RequestHandler } from "express";

    namespace vitalsigns {
        /**
         * Contraint.
         * @interface
         */
        export interface Constraint {
            /**
             * The comparator to use when comparing the field's value with the constraint value.
             * Valid comparators are: 'equal', 'greater', and 'less'.
             */
            comparator: string;

            /**
             * The name of the field to be constrained.
             */
            field: string;

            /**
             * The name of the monitor containing the field to be constrained.
             */
            monitor: string;

            /**
             * true to negate the outcome of the comparison; false or omitted to use the comparison result.
             */
            negate?: boolean | undefined;

            /**
             * The value against which the field should be compared.
             */
            value: any;
        }

        /**
         * Constraint wrapper.
         * @interface
         */
        export interface ConstraintWrapper {
            equals?: ((num: number) => ConstraintWrapper) | undefined;

            greaterThan?: ((num: number) => ConstraintWrapper) | undefined;

            lessThan?: ((num: number) => ConstraintWrapper) | undefined;

            not?: ConstraintWrapper | undefined;
        }

        /**
         * Options.
         * @interface
         */
        export interface Options {
            /**
             * Number of milliseconds to wait between automatic health checks.
             */
            autoCheck?: number | boolean | undefined;

            /**
             * HTTP response code to send back in the VitalSigns.
             */
            httpHealthy?: number | undefined;

            /**
             * HTTP response code to send back in the VitalSigns.
             */
            httpUnhealthy?: number | undefined;
        }

        export interface Monitor {
            /**
             * Connections.
             */
            connections: any;
        }

        /**
         * Monitor field.
         * @interface
         */
        export interface MonitorField {
            /**
             * Name.
             */
            name?: string | undefined;

            /**
             * Units.
             */
            units?: string | undefined;
        }

        /**
         * Report options.
         * @interface
         */
        interface ReportOptions {
            /**
             * true to flatten the report object down to a single level by concatenating nested key names; false to keep the default hierarchical format.
             */
            flatten?: boolean | undefined;

            /**
             * If flatten is true, this string will be used to separate key names when they are concatenated together.
             */
            separator?: string | undefined;
        }
    }

    /**
     * VitalSigns instance.
     */
    class VitalSigns {
        /**
         * Constructor.
         * @param {Options} [options] Options.
         */
        constructor (options?: vitalsigns.Options);

        /**
         * Pushes a health constraint onto this instance's constraint array.
         * Health constraints define scenarios in which VitalSigns will consider the application to be in an unhealthy state.
         * @param {} constraint A constraint.
         */
        addConstraint(): void;

        /**
         * Destroys this VitalSigns instance.
         */
        destroy(): void;

        /**
         * Gets a request handler.
         */
        express: RequestHandler;

        /**
         * Retrieves an array of human-readable messages that define the specific health constraints that failed when running the last health check.
         * @returns {Array<string>} An array of failure messages.
         */
        getFailed(): Array<string>;

        /**
         * Gets a report of all monitors, their fields, and the values of those fields, compiled into Javascript object form.  Additionally, a 'healthy' field is
         * attached. This field will be boolean true if all health constraints passed; false otherwise.
         * @param {ReportOptions} [options] A mapping of options to customize this report.
         * @return {Object} The full health report.
         */
        getReport(options?: vitalsigns.ReportOptions): {};

        /**
         * Generates a health report and checks each health constraint against it. Any constraints that fail will be added to the 'failed' array in the form of
         * a human-readable failure message, which can be retrieved with {@link #getFailed}.
         * @param {Object} [report] A report object on which to run the health constraints. If omitted, this function will generate a health report automatically.
         * @return {boolean} true if all health constraints passed; false otherwise.
         */
        isHealthy(report?: {}): boolean;

        /**
         * Registers monitor.
         * @param {string} monitorName A monitor name.
         * @param {MonitorField} [field] Options.
         */
        monitor(monitor: string | vitalsigns.Monitor | {}, field?: vitalsigns.MonitorField): void;

        /**
         * Defines a new health constraint in a chainable, more easily readable format.
         * When called with the monitor name and field name of concern, a wrapper is
         * returned that allows the constraint to be built out with function calls.
         * @param {string} monitorName A monitor name.
         * @param {string} fieldName A field name.
         * @return {ConstraintWrapper} The constraint wrapper.
         */
        unhealthyWhen: (monitorName: string, fieldName: string) => vitalsigns.ConstraintWrapper;
    }

    export = VitalSigns;
}
