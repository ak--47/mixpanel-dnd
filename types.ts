export interface Config {
	token: string
	secret: string
	region: string
	format: string
	dataType: string
	aliases: Aliases
	files: File[]
	transformType: string
  }
  
  export interface Aliases {
	event?: string
	distinct_id?: string
	time?: string
	insert_id?: string
	name?: string
	email?: string
	createdAt?: string
	groupId?: string
	groupKey?: string
  }
  
  export interface File {
	path: string
	lines: number
  }
  