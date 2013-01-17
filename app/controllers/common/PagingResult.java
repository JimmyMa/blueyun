package controllers.common;

import java.util.List;

public class PagingResult<Type> {
	
	public int totolPages;
	public int currentPage;
	public List<Type> elements;
}
