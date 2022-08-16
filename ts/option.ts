/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:48 PM -- August 16th, 2022
 * Project: optionals
 */

type ValueOrUndefined<T, S extends boolean> = S extends true ? T : undefined;

type Not<B extends boolean> = B extends true ? false : true;

export class Option<T, S extends boolean> {
	
	private value: ValueOrUndefined<T, S>;
	
	private hasValue: S;

	protected constructor(value: ValueOrUndefined<T, S>, hasValue: S) {
		
		this.value = value;
		this.hasValue = hasValue;
		
	}
	
	public static some<T>(value: T): Option<T, true> {
		
		return new Option<T, true>(value, true);
		
	}
	
	public static none<T>(): Option<T, false> {
		
		return new Option<T, false>(undefined, false);
		
	}
	
	public isSome(): S {
		
		return this.hasValue;
		
	}
	
	public isNone(): Not<S> {
		
		return !this.hasValue as Not<S>;
		
	}
	
	public unwrapOr<T1 extends T>(defaultValue: T1): S extends true ? T : T1 {
		
		if (this.isSome()) return this.value as (S extends true ? T : T1);
		else return defaultValue;
		
	}
	
}
