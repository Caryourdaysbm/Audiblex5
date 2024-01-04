import React from "react";

const Accordion = () => {
	return (
		<>
			<div className="accordion desktop_accordion " id="accordion_filter">
				<h3>Filters by</h3>

				{/* LOCATION */}
				<div>
					<input
						type="checkbox"
						name="toggle_accordion"
						id="acc4"
						className="acc_input"
					/>
					<label htmlFor="acc4" className="acc_label">
						Location
					</label>

					<div className="acc_content">
						<input type="text" name="" id="" placeholder="e.g Nigeria" />
					</div>
				</div>

				{/* CATEGORIES */}
				<div>
					<input
						type="checkbox"
						name="toggle_accordion"
						id="acc5"
						className="acc_input"
					/>
					<label htmlFor="acc5" className="acc_label">
						Categories
					</label>

					<div className="acc_content" id="JobCategories">
						<div className="check_parent">
							<label className="checkbox">
								Shirt
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="check_parent">
							<label className="checkbox">
								Suits
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="check_parent">
							<label className="checkbox">
								Round Necks
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="check_parent">
							<label className="checkbox">
								Traditional Wears
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="check_parent">
							<label className="checkbox">
								Jeans
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
					</div>
				</div>

				{/* REVIEWS */}
				<div>
					<input
						type="checkbox"
						name="toggle_accordion"
						id="acc6"
						className="acc_input"
					/>
					<label htmlFor="acc6" className="acc_label">
						Reviews
					</label>

					<div className="acc_content">
						<div className="check_parent">
							<label className="checkbox">
								&lt; 5 stars
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="check_parent">
							<label className="checkbox">
								&gt; 5 stars
								<input type="checkbox" />
								<span className="checkmark"></span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Accordion;
