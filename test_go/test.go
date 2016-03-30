package main

import "fmt"

func main() {
	fmt.Println("This is only a test")
	test := "Hurpa derp" + " durr"
	if test != "" {
		fmt.Println(test)
	} else {
		fmt.Println("Nerd")
	}
}
